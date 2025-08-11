// Import Dependencies
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getUsers, getUserStats, updateUserStatus, deleteUser, inviteUser } from "utils/usersService";

// ----------------------------------------------------------------------

const UsersContext = createContext();

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  // Modal states
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Users data states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Pagination states
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    role_id: '0', // '0' means all roles
    is_active: 'all', // 'all', '1', '0'
    search: ''
  });
  
  // Stats states
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    admins: 0,
    pending: 0
  });

  // Fetch users with current filters and pagination
  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page,
        per_page: pagination.per_page,
        ...filters
      };
      
      const result = await getUsers(params);
      
      if (result.success) {
        setUsers(result.data.data || []);
        setPagination({
          current_page: result.data.current_page || 1,
          per_page: result.data.per_page || 10,
          total: result.data.total || 0,
          total_pages: result.data.total_pages || 0
        });
      } else {
        setError(result.error);
        setUsers([]);
      }
    } catch (err) {
      console.error('Error in fetchUsers:', err);
      setError('An unexpected error occurred while fetching users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.per_page]);

  // Fetch user statistics
  const fetchStats = useCallback(async () => {
    try {
      const result = await getUserStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    fetchUsers(1);
    fetchStats();
  }, [fetchUsers, fetchStats]);

  // Modal functions
  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  const openEditModal = (user = null) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.total_pages) {
      fetchUsers(page);
    }
  };

  const changePerPage = (perPage) => {
    setPagination(prev => ({ ...prev, per_page: perPage }));
    fetchUsers(1); // Reset to first page
  };

  // Filter functions
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const applyFilters = () => {
    fetchUsers(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      role_id: '0',
      is_active: 'all',
      search: ''
    });
  };

  // Search function
  const handleSearch = (searchTerm) => {
    updateFilters({ search: searchTerm });
    // Debounce search - apply after user stops typing
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  // User actions
  const handleUpdateUserStatus = async (userId, isActive) => {
    try {
      const result = await updateUserStatus(userId, isActive);
      
      if (result.success) {
        // Update the user in the local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId 
              ? { ...user, is_active: isActive }
              : user
          )
        );
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error updating user status:', err);
      return { success: false, error: 'Failed to update user status' };
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);
      
      if (result.success) {
        // Remove user from local state
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      return { success: false, error: 'Failed to delete user' };
    }
  };

  const handleInviteUser = async (email) => {
    try {
      const result = await inviteUser(email);
      if (result.success) {
        // Optionally, refetch users or update stats
        fetchUsers(1);
        fetchStats();
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error inviting user:', err);
      return { success: false, error: 'Failed to invite user' };
    }
  };

  const exportUsers = () => {
    // Export functionality implementation
    console.log('exportUsers called');
    // You can implement CSV/Excel export here
  };

  const value = {
    // Modal states
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    
    // Users state
    users,
    setUsers,
    loading,
    setLoading,
    error,
    setError,
    selectedUser,
    setSelectedUser,
    
    // Pagination state
    pagination,
    goToPage,
    changePerPage,
    
    // Filters state
    filters,
    updateFilters,
    applyFilters,
    clearFilters,
    handleSearch,
    
    // Stats state
    stats,
    
    // Actions
    fetchUsers,
    handleUpdateUserStatus,
    handleDeleteUser,
    handleInviteUser,
    exportUsers,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext }; 