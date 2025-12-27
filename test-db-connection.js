import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing Database Connection...\n');
console.log('Configuration:');
console.log('  DB_HOST:', process.env.DB_HOST);
console.log('  DB_USER:', process.env.DB_USER);
console.log('  DB_NAME:', process.env.DB_NAME);
console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-3) : 'NOT SET');
console.log('\n');

// Common host variations to try
const hostsToTry = [
    process.env.DB_HOST,
    '127.0.0.1',
    'sql12.freesqldatabase.com',
    'sql.freedb.tech',
    // Add your actual remote host here if you know it
];

async function testConnection(host) {
    try {
        console.log(`\n📡 Trying host: ${host}...`);
        const connection = await mysql.createConnection({
            host: host,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectTimeout: 5000
        });

        await connection.ping();
        console.log(`✅ SUCCESS! Connected to ${host}`);
        console.log(`\n🎉 Update your .env file with:`);
        console.log(`DB_HOST=${host}`);

        await connection.end();
        return true;
    } catch (err) {
        console.log(`❌ Failed: ${err.message}`);
        return false;
    }
}

async function findWorkingHost() {
    console.log('🔎 Searching for working database host...\n');

    for (const host of hostsToTry) {
        if (!host) continue;
        const success = await testConnection(host);
        if (success) {
            process.exit(0);
        }
    }

    console.log('\n\n❌ Could not connect to any host.');
    console.log('\n📋 Common issues:');
    console.log('  1. DB_HOST is incorrect (not localhost for remote databases)');
    console.log('  2. Database server is not running');
    console.log('  3. Firewall blocking connection');
    console.log('  4. User not allowed to connect from your IP');
    console.log('\n💡 Check your database provider dashboard for:');
    console.log('  - Remote MySQL Host/Server address');
    console.log('  - Port number (default: 3306)');
    console.log('  - Allowed remote access IPs');

    process.exit(1);
}

findWorkingHost();
