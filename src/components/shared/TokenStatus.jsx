import { useAuthContext } from "app/contexts/auth/context";
import { isTokenValid } from "utils/jwt";
import { Button } from "components/ui";

export default function TokenStatus() {
  const { user, logout } = useAuthContext();
  
  const token = localStorage.getItem('authToken');
  const isTokenValidNow = token ? isTokenValid(token) : false;
  
  const handleTestUnauthorized = async () => {
    try {
      // This will trigger a 401 response and auto-logout
      const response = await fetch('https://docuhub-1525466ccc8b.herokuapp.com/api/v1/test-unauthorized', {
        headers: {
          'Authorization': `Bearer invalid-token`
        }
      });
    } catch (error) {
      console.log('Test unauthorized error:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Token Status</h3>
      <div className="space-y-2 text-sm">
        <p><strong>User:</strong> {user?.first_name} {user?.last_name}</p>
        <p><strong>Token Exists:</strong> {token ? 'Yes' : 'No'}</p>
        <p><strong>Token Valid:</strong> {isTokenValidNow ? 'Yes' : 'No'}</p>
        <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
      </div>
      
      <div className="mt-4 space-x-2">
        <Button 
          onClick={logout}
          color="danger"
          size="sm"
        >
          Manual Logout
        </Button>
        
        <Button 
          onClick={handleTestUnauthorized}
          color="warning"
          size="sm"
        >
          Test Auto-Logout
        </Button>
      </div>
    </div>
  );
} 