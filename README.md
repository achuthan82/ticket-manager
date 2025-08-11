# DocuPrompt Hub

A modern React application for document and prompt management.

## Features

- **Authentication System**: Secure login with email/password
- **Modern UI**: Built with React and Tailwind CSS
- **Form Validation**: Using Yup and React Hook Form
- **API Integration**: RESTful API with Axios
- **User Data Persistence**: Secure localStorage storage for better UX
- **Auto Logout**: Automatic logout on token expiration with redirect to login
- **Server Logout**: API integration for proper session termination
- **User Management**: Complete user listing with pagination, filtering, and search

## Login Implementation

The login functionality has been implemented with the following features:

### API Configuration
- **Base URL**: `https://docuhub-1525466ccc8b.herokuapp.com/api/v1`
- **Login Endpoint**: `POST /auth/login`
- **Logout Endpoint**: `POST /auth/logout`
- **Users Endpoint**: `GET /users`

### Request Format
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

### Response Format
```json
{
  "auth_token": "jwt_token_here",
  "data": {
    "department_id": 1,
    "email": "user@example.com",
    "first_name": "User",
    "id": "user-id-here",
    "last_name": "Name",
    "permissions": [],
    "role_id": 1
  },
  "status": 200
}
```

### User Data Storage

The application uses a **hybrid approach** for user data management:

#### ✅ **What's Stored in localStorage:**
- JWT authentication token
- **Sanitized user data** (non-sensitive information only):
  - User ID
  - Email address
  - First and last name
  - Department ID
  - Role ID
  - Permissions array

#### ❌ **What's NOT Stored:**
- Passwords
- Sensitive tokens
- Private keys
- Any other sensitive information

#### **Benefits:**
- **Faster app initialization** - no need to fetch user data on every page load
- **Better offline experience** - user data available even without network
- **Reduced API calls** - fewer requests to server
- **Improved UX** - no loading states on app refresh

#### **Security Measures:**
- User data is **sanitized** before storage
- Only **non-sensitive** information is stored locally
- JWT token contains user info, localStorage is just for convenience
- Automatic cleanup on logout or token expiration

### Auto Logout & 401 Handling

The application automatically handles token expiration and unauthorized access:

#### **Automatic Token Validation:**
- ✅ **Request Interceptor**: Automatically adds `Authorization: Bearer <token>` header to all requests
- ✅ **Response Interceptor**: Detects 401 responses and triggers auto-logout
- ✅ **Token Validation**: Checks token expiration before making requests

#### **Auto Logout Flow:**
1. **API Request** → Server returns 401 Unauthorized
2. **Axios Interceptor** → Detects 401 response
3. **Auth Manager** → Triggers logout and redirect
4. **Login Page** → Shows error message from redirect
5. **User Experience** → Seamless redirect with clear error message

#### **Error Messages:**
- **Token Expired**: "Session expired. Please login again."
- **Invalid Token**: "Session expired. Please login again."
- **Server Error**: Custom message from server response

#### **Redirect Handling:**
- ✅ **Automatic Redirect**: Redirects to `/auth/login` on 401
- ✅ **Error Message Display**: Shows error message on login page
- ✅ **State Cleanup**: Clears auth data and user state
- ✅ **URL State**: Passes error message through URL state

### Logout Implementation

The logout functionality includes both client-side and server-side session termination:

#### **Manual Logout Flow:**
1. **User clicks logout** → Triggers logout function
2. **API Call** → `POST /auth/logout` to invalidate server token
3. **Local Cleanup** → Clear localStorage and auth state
4. **Redirect** → Navigate to login page

#### **Auto Logout Flow (401 Response):**
1. **401 Response** → Axios interceptor detects unauthorized
2. **API Call** → `POST /auth/logout` to invalidate server token
3. **Local Cleanup** → Clear localStorage and auth state
4. **Error Message** → Store error message for login page
5. **Redirect** → Navigate to login page with error message

#### **Error Handling:**
- ✅ **Graceful Degradation**: Logout completes even if API call fails
- ✅ **Error Logging**: Failed API calls are logged but don't block logout
- ✅ **Always Clean**: Local session is always cleared regardless of API result

### User Management Implementation

The user management system includes comprehensive API integration with advanced features:

#### **User Listing API:**
- **Endpoint**: `GET /users`
- **Authorization**: Required (Bearer token)
- **Pagination**: `page` and `per_page` parameters
- **Filtering**: `role_id` and `is_active` parameters
- **Search**: `search` parameter for name, email, or phone

#### **API Parameters:**
```javascript
// Required parameters
page: 1,           // Page number
per_page: 10,      // Items per page

// Optional parameters
role_id: 1,        // Filter by role (0 = all roles)
is_active: true,   // Filter by status (all, true, false)
search: "john"     // Search term
```

#### **Response Format:**
```json
{
  "data": [
    {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role_id": 1,
      "is_active": true,
      "document_count": 12,
      "this_week": 5,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "current_page": 1,
  "per_page": 10,
  "total": 100,
  "total_pages": 10
}
```

#### **Features Implemented:**

##### **✅ Pagination:**
- Page navigation with Previous/Next buttons
- Page number display with current page highlighting
- Items per page selector (5, 10, 20, 50)
- Total results counter
- Responsive design for mobile and desktop

##### **✅ Filtering:**
- Role filter (All, Administrator, User, Manager)
- Status filter (All, Active, Inactive)
- Clear filters button
- Real-time filter application

##### **✅ Search:**
- Debounced search input (500ms delay)
- Search across name, email, and phone
- Real-time search results
- Clear search functionality

##### **✅ User Actions:**
- Edit user (opens edit modal)
- Activate/Deactivate user status
- Delete user with confirmation
- Status toggle with immediate feedback

##### **✅ Error Handling:**
- Network error handling
- Server error messages
- Loading states
- Empty state handling
- Authorization error handling

##### **✅ Statistics Dashboard:**
- Total users count
- Active users count
- Admin users count
- Pending users count
- Real-time stats from API

#### **User Management Flow:**
1. **Load Users** → Fetch users with current filters and pagination
2. **Apply Filters** → Update filters and reload data
3. **Search Users** → Debounced search with API call
4. **Navigate Pages** → Load specific page of results
5. **User Actions** → Perform actions with error handling
6. **Real-time Updates** → Update local state after actions

### Error Handling
- Network errors
- Server errors (400, 401, 500+)
- Validation errors
- Invalid response format
- **401 Unauthorized** (auto-logout with redirect)
- **User Management Errors** (with user-friendly messages)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to the login page

## Development

- **Login Form**: `src/app/pages/Auth/index.jsx`
- **Auth Context**: `src/app/contexts/auth/Provider.jsx`
- **API Config**: `src/configs/auth.config.js`
- **Validation Schema**: `src/app/pages/Auth/schema.js`
- **User Data Utils**: `src/utils/userData.js`
- **JWT Utils**: `src/utils/jwt.js`
- **Auth Manager**: `src/utils/authManager.js`
- **Axios Config**: `src/utils/axios.js`
- **Users Service**: `src/utils/usersService.js`
- **Users Context**: `src/app/contexts/users/context.jsx`
- **Users Page**: `src/app/pages/user-management/Users.jsx`

## User Data Utilities

The application includes utility functions for user data management:

```javascript
import { 
  getUserFullName, 
  hasPermission, 
  isAdmin, 
  getUserDepartment 
} from 'utils/userData';

// Get user's full name
const fullName = getUserFullName(userData);

// Check permissions
const canEdit = hasPermission(userData, 'edit');

// Check if admin
const isUserAdmin = isAdmin(userData);

// Get department
const department = getUserDepartment(userData);
```

## Testing Auto-Logout

You can test the auto-logout functionality using the `TokenStatus` component:

```javascript
import TokenStatus from 'components/shared/TokenStatus';

// Add to any page to test token status and auto-logout
<TokenStatus />
```

This component provides:
- Current token status
- Manual logout button
- Test auto-logout button (triggers 401 response)

## User Management Testing

The user management system can be tested with:

```javascript
// Test user listing with filters
const { fetchUsers, updateFilters, applyFilters } = useUsersContext();

// Apply role filter
updateFilters({ role_id: '1' });
applyFilters();

// Search users
updateFilters({ search: 'john' });
applyFilters();

// Change pagination
goToPage(2);
changePerPage(20);
```
