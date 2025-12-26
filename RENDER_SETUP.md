# Render Environment Variables Setup

## Your Hostinger Database Details

**MySQL Hostname**: `srv1495.hstgr.io` (or `193.203.184.98`)
**Database Name**: `u434378979_beyond_invite`
**Username**: `u434378979_user`
**Password**: `Beyond@123`
**Port**: `3306` (default)

## Step 1: Enable Remote Access in Hostinger

1. Go to: Hostinger → Databases → Remote MySQL
2. Add IP address: `0.0.0.0/0` (allows all IPs)
3. Select database: `u434378979_beyond_invite`
4. Click "Create" or "Add"

## Step 2: Configure Render Environment Variables

Go to: **Render Dashboard → Your Service → Environment**

### Option A: Individual Variables (Recommended)

Add these environment variables one by one:

```
DB_HOST=srv1495.hstgr.io
DB_USER=u434378979_user
DB_PASSWORD=Beyond@123
DB_NAME=u434378979_beyond_invite
JWT_SECRET=bdfsnjkfjkndckddfisojds
JWT_EXPIRY=24h
PORT=5001
```

### Option B: Single Connection String

Add just one variable:

```
DATABASE_URL=mysql://u434378979_user:Beyond@123@srv1495.hstgr.io:3306/u434378979_beyond_invite
```

## Step 3: Save and Deploy

1. Click **"Save Changes"** in Render
2. Render will automatically redeploy
3. Monitor the deployment logs

## Expected Result

You should see in the logs:
```
Testing database connection...
✓ Database connected successfully
✓ Server running on port 5001
✓ Environment: production
✓ Database: Local
```

## Troubleshooting

### If you see "Access Denied"
- ✅ Verify password is exactly: `Beyond@123`
- ✅ Check username is: `u434378979_user`
- ✅ Ensure Remote MySQL is enabled in Hostinger

### If you see "Connection Timeout"
- ✅ Make sure you added `0.0.0.0/0` to allowed IPs
- ✅ Wait a few minutes for Hostinger to update settings
- ✅ Try using IP address instead: `193.203.184.98`

### If you see "Unknown Database"
- ✅ Verify database name is exactly: `u434378979_beyond_invite`

## Testing Locally

Update your local `.env` file:

```env
PORT=5001
DB_HOST=srv1495.hstgr.io
DB_USER=u434378979_user
DB_PASSWORD=Beyond@123
DB_NAME=u434378979_beyond_invite
JWT_SECRET=bdfsnjkfjkndckddfisojds
JWT_EXPIRY=24h
```

Then run:
```bash
npm start
```

You should see:
```
Testing database connection...
✓ Database connected successfully
✓ Server running on port 5001
```

## Security Note

⚠️ **Important**: Using `0.0.0.0/0` allows connections from any IP. For better security:
1. Find Render's IP ranges
2. Add only those specific IPs to Hostinger
3. Or use a dedicated cloud database like PlanetScale

For now, `0.0.0.0/0` is fine for development and testing.
