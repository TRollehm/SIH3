import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { User, Mail, Building, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth, getInitials } from '../context/AuthContext';

export const Settings: React.FC = () => {
  const { user, updateProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [role, setRole] = useState(user?.role || 'procurement');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setOrganization(user.organization || '');
      setRole(user.role || 'procurement');
    }
  }, [user]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    await updateProfile({
      name,
      organization,
      role
    });
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const avatarInitials = getInitials(name || user?.name);

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            {saveSuccess && (
              <div className="mb-4 p-3 bg-olive-50 border border-olive-200 text-olive-800 rounded-md text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-olive-600" />
                Profile updated successfully. Initials updated across all headers and components.
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-shrink-0 flex justify-center">
                <div 
                  title={`Avatar for ${name || 'User'}`}
                  className="w-24 h-24 bg-olive-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-sm select-none"
                >
                  {avatarInitials}
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<User className="w-5 h-5 text-text-secondary" />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  helperText="Email address cannot be modified"
                  icon={<Mail className="w-5 h-5 text-text-secondary" />}
                />
                <Input
                  label="Organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  icon={<Building className="w-5 h-5 text-text-secondary" />}
                />
                <Select
                  label="Role"
                  options={[
                    { value: 'Procurement Officer', label: 'Procurement Officer' },
                    { value: 'Technical Evaluator', label: 'Technical Evaluator' },
                    { value: 'Quality Inspector', label: 'Quality Inspector' },
                    { value: 'Manager', label: 'Manager' },
                    { value: 'Administrator', label: 'Administrator' }
                  ]}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                variant="primary" 
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <Select
                  label="Default Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'hi', label: 'Hindi' }
                  ]}
                  value="en"
                  onChange={() => {}}
                />
                <Select
                  label="Default Category"
                  options={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'electrical', label: 'Electrical Engineering' },
                    { value: 'mechanical', label: 'Mechanical Engineering' },
                    { value: 'civil', label: 'Civil Engineering' }
                  ]}
                  value="all"
                  onChange={() => {}}
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-border text-olive-600 focus:ring-olive-500" defaultChecked />
                  <div>
                    <div className="font-medium text-text">Include allied standards in results</div>
                    <div className="text-sm text-text-secondary">Show related standards automatically</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-border text-olive-600 focus:ring-olive-500" defaultChecked />
                  <div>
                    <div className="font-medium text-text">Show certification requirements</div>
                    <div className="text-sm text-text-secondary">Highlight if BIS certification is mandatory</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-border text-olive-600 focus:ring-olive-500" />
                  <div>
                    <div className="font-medium text-text">Email notifications for analysis completion</div>
                    <div className="text-sm text-text-secondary">Receive an email when large analyses finish</div>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="primary">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <p className="text-sm text-text-secondary">Account created: September 1, 2026</p>
              <p className="text-sm text-text-secondary">Last login: September 6, 2026</p>
            </div>
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-1">Session Management</h3>
                <p className="text-xs text-text-secondary">Sign out of your workstation on this browser.</p>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Sign Out
              </Button>
            </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-red-600 mb-1">Danger Zone</h3>
                <p className="text-xs text-text-secondary mb-3">
                  Permanently remove your account, profile, and access credentials. Once deleted, you cannot log back in with these credentials.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setDeleteError(null);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delete Account Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => !isDeleting && setShowDeleteModal(false)}
          title="Delete Account Permanently"
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">This action cannot be undone.</p>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  Your officer account for <strong>{user?.email}</strong>, along with your stored credentials and associated profile data, will be permanently erased. You will be signed out and unable to log in again with this account.
                </p>
              </div>
            </div>

            {deleteError && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">
                {deleteError}
              </div>
            )}

            <div className="pt-4 flex justify-end gap-3 border-t border-border">
              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isDeleting}
                className="flex items-center gap-2"
                onClick={async () => {
                  setIsDeleting(true);
                  setDeleteError(null);
                  try {
                    const result = await deleteAccount();
                    if (result.success) {
                      setShowDeleteModal(false);
                      navigate('/', { replace: true });
                    } else {
                      setDeleteError(result.error || 'Failed to delete account. Please try again.');
                    }
                  } catch (err) {
                    setDeleteError('An unexpected error occurred. Please try again.');
                  } finally {
                    setIsDeleting(false);
                  }
                }}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting Account...</span>
                  </>
                ) : (
                  <span>Permanently Delete</span>
                )}
              </Button>
            </div>
          </div>
        </Modal>
    </div>
  );
};
