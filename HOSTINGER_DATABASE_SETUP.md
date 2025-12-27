# Hostinger Database Setup Guide

## Problem
Your database is hosted on **Hostinger** (remote server), but your `.env` file is configured for `localhost`. This causes the "Access Denied" error.

## Solution: Find Your Remote MySQL Host

### Step 1: Find the Remote MySQL Host Address

1. **Log in to Hostinger hPanel**
2. **Go to**: Websites → beyondinvite.com → Databases → Management
3. **Look for**: "Remote MySQL" or "MySQL Hostname" section
4. **Common Hostinger MySQL hosts**:
   - `mysql.hostinger.com`
   - `mysql.hostinger.in`
   - `mysql.hostinger.co.uk`
   - Or an IP address like `123.45.67.89`

### Step 2: Enable Remote MySQL Access

1. In the **MySQL Databases** section, find **"Remote MySQL"**
2. Click on **"Manage"** or **"Remote MySQL"**
3. **Add your IP address** to the allowed list:
   - For development: Add your current IP
   - For Render deployment: Add `0.0.0.0/0` (allow all) or Render's IP ranges
4. **Save** the changes

### Step 3: Update Your .env File

Based on your screenshot, update your `.env` file:

```env
PORT=5001
DB_HOST=mysql.hostinger.com
DB_USER=u434378979_user
DB_PASSWORD=Beyond@123
DB_NAME=u434378979_beyond_invite
JWT_SECRET=bdfsnjkfjkndckddfisojds
JWT_EXPIRY=24h
```

**Important**: Replace `mysql.hostinger.com` with the actual host from your Hostinger panel.

### Step 4: Alternative - Use DATABASE_URL

Instead of individual credentials, you can use a single connection string:

```env
DATABASE_URL=mysql://u434378979_user:Beyond@123@mysql.hostinger.com:3306/u434378979_beyond_invite
```

## For Render Deployment

### Option 1: Use Your Hostinger Database (Recommended for Quick Deploy)

1. **In Render Dashboard** → Your Web Service → Environment
2. **Add environment variables**:
   ```
   DB_HOST=mysql.hostinger.com
   DB_USER=u434378979_user
   DB_PASSWORD=Beyond@123
   DB_NAME=u434378979_beyond_invite
   JWT_SECRET=bdfsnjkfjkndckddfisojds
   JWT_EXPIRY=24h
   ```

3. **Enable Remote Access in Hostinger**:
   - Add `0.0.0.0/0` to allowed IPs (or Render's IP ranges)

### Option 2: Use a Cloud Database (Better for Production)

Use **PlanetScale** (free MySQL) or **Render PostgreSQL**:

1. **PlanetScale** (MySQL - easiest migration):
   - Sign up at https://planetscale.com
   - Create database
   - Get connection string
   - Add to Render as `DATABASE_URL`

2. **Render PostgreSQL** (requires code changes):
   - Create PostgreSQL database in Render
   - Update code to use `pg` instead of `mysql2`
   - Update SQL queries to PostgreSQL syntax

## Testing Locally

### Test 1: Verify Remote Host

Run the diagnostic script:
```bash
node test-db-connection.js
```

### Test 2: Start Server (Skip DB Check)

If you want to test the server without database:
```bash
SKIP_DB_CHECK=true npm start
```

### Test 3: Start Server (With DB)

Once you have the correct host:
```bash
npm start
```

## Common Hostinger MySQL Hosts by Region

- **USA**: `mysql.hostinger.com`
- **India**: `mysql.hostinger.in`
- **UK**: `mysql.hostinger.co.uk`
- **Brazil**: `mysql.hostinger.com.br`
- **Lithuania**: `mysql.hostinger.lt`

## Troubleshooting

### Error: "Access Denied"
- ✅ Check DB_HOST is correct (not localhost)
- ✅ Verify password matches Hostinger
- ✅ Enable Remote MySQL in Hostinger panel
- ✅ Add your IP to allowed list

### Error: "Connection Timeout"
- ✅ Check firewall settings
- ✅ Verify Remote MySQL is enabled
- ✅ Check if port 3306 is open

### Error: "Unknown Database"
- ✅ Verify DB_NAME matches exactly
- ✅ Check database exists in Hostinger

## Next Steps

1. ✅ Find your Remote MySQL host in Hostinger panel
2. ✅ Enable Remote MySQL access
3. ✅ Update `.env` with correct DB_HOST
4. ✅ Test locally with `npm start`
5. ✅ Commit and push changes to Git
6. ✅ Deploy to Render with environment variables
