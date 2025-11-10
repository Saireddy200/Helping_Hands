# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in this project, please email security@helpinghands.com instead of using the issue tracker. Please do not publicly disclose the vulnerability until it has been addressed.

## Security Best Practices

### Environment Variables
- **Never** commit `.env` files to the repository
- Always use `.env.local` for local development (which is in `.gitignore`)
- In production (Vercel), use the dashboard to set environment variables
- Keep secrets in environment variables only, never hardcode them

### MongoDB Credentials
- Never include MongoDB connection strings with passwords in documentation
- Always use placeholder values like `<password>` or `[YOUR_PASSWORD]`
- If credentials are exposed, immediately rotate them in MongoDB Atlas
- Monitor MongoDB Atlas for unauthorized access attempts

### Git History
- Sensitive information accidentally committed should be purged from git history
- Use `git filter-branch` or `git filter-repo` to remove sensitive data from history
- Force push only to personal repositories, never shared ones

## Current Status
✅ All hardcoded credentials removed from source code
✅ Environment variables properly configured
✅ .env files in .gitignore
✅ MIT License applied

## References
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)
