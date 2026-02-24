#!/usr/bin/env node

/**
 * Menu data validation script
 * Validates the structure and integrity of menu.json
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REQUIRED_FIELDS = ['id', 'name', 'description', 'price', 'category', 'image'];
const VALID_CATEGORIES = ['combos', 'sanduiches', 'kikao', 'bebidas', 'porcoes', 'pratos', 'sobremesas'];

let errors = [];
let warnings = [];

function validateItem(item, category, index) {
    const prefix = `${category}[${index}]`;
    
    // Check required fields
    REQUIRED_FIELDS.forEach(field => {
        if (!(field in item)) {
            errors.push(`${prefix}: Missing required field "${field}"`);
        }
    });

    // Validate field types
    if (item.id && typeof item.id !== 'string') {
        errors.push(`${prefix}: "id" must be a string`);
    }
    
    if (item.name && typeof item.name !== 'string') {
        errors.push(`${prefix}: "name" must be a string`);
    }
    
    if (item.description && typeof item.description !== 'string') {
        errors.push(`${prefix}: "description" must be a string`);
    }
    
    if (item.price !== undefined && typeof item.price !== 'number') {
        errors.push(`${prefix}: "price" must be a number`);
    }
    
    if (item.category && typeof item.category !== 'string') {
        errors.push(`${prefix}: "category" must be a string`);
    }
    
    if (item.image && typeof item.image !== 'string') {
        errors.push(`${prefix}: "image" must be a string`);
    }

    // Validate price range
    if (item.price !== undefined) {
        if (item.price < 0) {
            errors.push(`${prefix}: "price" cannot be negative`);
        }
        if (item.price > 1000) {
            warnings.push(`${prefix}: "price" is unusually high (${item.price})`);
        }
    }

    // Validate category matches
    if (item.category && item.category !== category) {
        warnings.push(`${prefix}: Item category "${item.category}" doesn't match parent category "${category}"`);
    }

    // Check for empty strings
    if (item.name === '') {
        errors.push(`${prefix}: "name" cannot be empty`);
    }
    if (item.description === '') {
        warnings.push(`${prefix}: "description" is empty`);
    }

    // Validate optional fields
    if (item.popular !== undefined && typeof item.popular !== 'boolean') {
        errors.push(`${prefix}: "popular" must be a boolean`);
    }
}

function validateMenuData(data) {
    // Check if data is an object
    if (!data || typeof data !== 'object') {
        errors.push('Menu data must be an object');
        return;
    }

    // Check version field
    if (!data.version) {
        warnings.push('Menu data is missing "version" field');
    }

    // Validate each category
    VALID_CATEGORIES.forEach(category => {
        if (!(category in data)) {
            warnings.push(`Missing category "${category}"`);
            return;
        }

        if (!Array.isArray(data[category])) {
            errors.push(`Category "${category}" must be an array`);
            return;
        }

        // Validate each item in category
        data[category].forEach((item, index) => {
            validateItem(item, category, index);
        });
    });

    // Check for duplicate IDs
    const allIds = new Set();
    const duplicates = new Set();
    
    VALID_CATEGORIES.forEach(category => {
        if (Array.isArray(data[category])) {
            data[category].forEach(item => {
                if (item.id) {
                    if (allIds.has(item.id)) {
                        duplicates.add(item.id);
                    }
                    allIds.add(item.id);
                }
            });
        }
    });

    if (duplicates.size > 0) {
        errors.push(`Duplicate IDs found: ${Array.from(duplicates).join(', ')}`);
    }
}

function main() {
    console.log('🔍 Validating menu.json...\n');

    try {
        // Read menu.json
        const menuPath = join(__dirname, '../static/data/menu.json');
        const menuContent = readFileSync(menuPath, 'utf-8');
        
        // Parse JSON
        let menuData;
        try {
            menuData = JSON.parse(menuContent);
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', parseError.message);
            process.exit(1);
        }

        // Validate
        validateMenuData(menuData);

        // Report results
        if (errors.length > 0) {
            console.error('❌ VALIDATION FAILED\n');
            console.error('Errors:');
            errors.forEach(err => console.error(`  • ${err}`));
            console.error('');
        }

        if (warnings.length > 0) {
            console.warn('⚠️  Warnings:');
            warnings.forEach(warn => console.warn(`  • ${warn}`));
            console.warn('');
        }

        if (errors.length === 0) {
            const itemCount = VALID_CATEGORIES.reduce((sum, cat) => 
                sum + (Array.isArray(menuData[cat]) ? menuData[cat].length : 0), 0
            );
            
            console.log('✅ VALIDATION PASSED');
            console.log(`   Version: ${menuData.version || 'unknown'}`);
            console.log(`   Total items: ${itemCount}`);
            console.log(`   Categories: ${VALID_CATEGORIES.length}`);
            
            if (warnings.length === 0) {
                console.log('   No warnings');
            }
            
            process.exit(0);
        } else {
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ Error reading menu file:', error.message);
        process.exit(1);
    }
}

main();
