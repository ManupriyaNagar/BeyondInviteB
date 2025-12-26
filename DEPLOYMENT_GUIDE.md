# Deployment Guide for Render

## The Problem
You're getting `ECONNREFUSED` error because your app is trying to connect to `localhost` MySQL, which doesn't exist on Render's servers.

## Solution: Set Up a Cloud Database

### Option 1: Use PlanetScale (MySQL - Recommended for MySQL apps)

1. **Create a PlanetScale account**: https://planetscale.com/
2. **Create a new database**
3. **Get connection string**:
   - Go to your database dashboard
   - Click "Connect"
   - Select "Node.js" 
   - Copy the connection string (looks like: `mysql://user:password@host/database?ssl={"rejectUnauthorized":true}`)

4. **Add to Render**:
   - Go to your Render dashboard
   - Select your web service
   - Go to "Environment" tab
   - Add environment variable:
     - Key: `DATABASE_URL`
     - Value: (paste your PlanetScale connection string)

### Option 2: Use Render PostgreSQL (Requires code changes)

If you want to use PostgreSQL instead of MySQL:

1. **Create a PostgreSQL database on Render**:
   - In Render dashboard, click "New +"
   - Select "PostgreSQL"
   - Choose a name and region
   - Click "Create Database"

2. **Get the Internal Database URL**:
   - Once created, copy the "Internal Database URL"

3. **Update your code**:
   - Replace `mysql2` with `pg` (PostgreSQL driver)
   - Update queries to PostgreSQL syntax

4. **Add to Render**:
   - Go to your web service
   - Environment tab
   - Add: `DATABASE_URL` = (your PostgreSQL URL)

### Option 3: Use Railway MySQL

1. **Create Railway account**: https://railway.app/
2. **Create new project** → Add MySQL
3. **Get connection string** from MySQL service
4. **Add to Render** as `DATABASE_URL`

## Steps to Configure Render Environment Variables

1. Log in to Render: https://dashboard.render.com/
2. Select your web service
3. Click on "Environment" in the left sidebar
4. Click "Add Environment Variable"
5. Add the following variables:

```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=24h
PORT=5001
```

6. Click "Save Changes"
7. Your service will automatically redeploy

## Testing the Connection

After setting up the database and environment variables:

1. Check Render logs for any connection errors
2. Test the `/categories/test` endpoint to verify the server is running
3. Test the `/categories` endpoint to verify database connectivity

## Important Notes

- **Never commit `.env` file** to Git (it's for local development only)
- **Use Render's Environment Variables** for production secrets
- **Database URL format**: `mysql://username:password@host:port/database`
- The updated `db.js` now supports both:
  - `DATABASE_URL` (for cloud deployment)
  - Individual credentials (for local development)

## Troubleshooting

If you still get connection errors:

1. **Check database is running**: Verify your cloud database is active
2. **Verify credentials**: Double-check username, password, host
3. **Check SSL requirements**: Some databases require SSL connections
4. **Whitelist IP**: Some providers require whitelisting Render's IPs
5. **Check logs**: Look at Render logs for specific error messages

## Local Development

Your local setup remains unchanged. The `.env` file will continue to work for local development:

```env
PORT=5001
DB_HOST=localhost
DB_USER=beyonduser
DB_PASSWORD=Beyond@123
DB_NAME=beyond_invite
JWT_SECRET=my_super_secret_key
JWT_EXPIRY=24h
```
