import { useEffect, useState } from 'react';
import { clanService, Clan, ClanInvitation } from '../services/clanService';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import './Clans.css';

export default function Clans() {
  const { user } = useAuthStore();
  const [myClan, setMyClan] = useState<Clan | null>(null);
  const [invitations, setInvitations] = useState<ClanInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteUsername, setInviteUsername] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clan, invs] = await Promise.all([
        clanService.getMyClan(),
        clanService.getInvitations()
      ]);
      setMyClan(clan);
      setInvitations(invs);
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const city = formData.get('city') as string;

    try {
      const clan = await clanService.create({ name, description, city });
      setMyClan(clan);
      setShowCreateModal(false);
      setToast({ message: 'Clan créé avec succès !', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
    }
  };

  const handleInvite = async () => {
    if (!myClan || !inviteUsername.trim()) return;

    try {
      await clanService.invite(myClan.id, inviteUsername.trim());
      setInviteUsername('');
      setShowInviteModal(false);
      setToast({ message: 'Invitation envoyée !', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await clanService.acceptInvitation(invitationId);
      await loadData();
      setToast({ message: 'Invitation acceptée !', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await clanService.rejectInvitation(invitationId);
      await loadData();
      setToast({ message: 'Invitation refusée', type: 'info' });
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'LEADER':
        return '👑 Chef';
      case 'MODERATOR':
        return '🛡️ Modérateur';
      case 'MEMBER':
        return '👤 Membre';
      default:
        return role;
    }
  };

  const myRole = myClan?.members.find(m => m.userId === user?.id)?.role;

  if (loading) {
    return <LoadingSpinner size="lg" text="Chargement..." />;
  }

  return (
    <div className="clans">
      <div className="clans-header">
        <h1>👥 Clans</h1>
        <p>Rejoignez ou créez un clan pour comparer vos performances</p>
      </div>

      {invitations.length > 0 && (
        <div className="invitations-section">
          <h2>📨 Invitations en attente</h2>
          <div className="invitations-list">
            {invitations.map(inv => (
              <div key={inv.id} className="invitation-card">
                <div className="invitation-info">
                  <h3>{inv.clan?.name}</h3>
                  <p>Invitation de {inv.inviter?.name || 'Anonyme'}</p>
                </div>
                <div className="invitation-actions">
                  <button
                    onClick={() => handleAcceptInvitation(inv.id)}
                    className="accept-btn"
                  >
                    ✓ Accepter
                  </button>
                  <button
                    onClick={() => handleRejectInvitation(inv.id)}
                    className="reject-btn"
                  >
                    ✕ Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {myClan ? (
        <div className="my-clan-section">
          <div className="clan-header">
            <div>
              <h2>{myClan.name}</h2>
              {myClan.description && <p>{myClan.description}</p>}
              {myClan.city && <p className="clan-city">📍 {myClan.city}</p>}
            </div>
            <div className="clan-actions">
              {myRole === 'LEADER' && (
                <>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="invite-btn"
                  >
                    ➕ Inviter
                  </button>
                </>
              )}
              {myRole === 'MODERATOR' && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="invite-btn"
                >
                  ➕ Inviter
                </button>
              )}
            </div>
          </div>

          <div className="members-section">
            <h3>Membres ({myClan.members.length})</h3>
            <div className="members-list">
              {myClan.members.map(member => (
                <div key={member.id} className="member-card">
                  <div className="member-info">
                    <span className="member-name">
                      {member.user.name || 'Anonyme'}
                    </span>
                    <span className="member-role">{getRoleLabel(member.role)}</span>
                  </div>
                  {(myRole === 'LEADER' || (myRole === 'MODERATOR' && member.role === 'MEMBER')) && member.userId !== user?.id && (
                    <button
                      onClick={async () => {
                        if (confirm('Voulez-vous vraiment retirer ce membre ?')) {
                          try {
                            await clanService.removeMember(myClan.id, member.userId);
                            await loadData();
                            setToast({ message: 'Membre retiré', type: 'success' });
                          } catch (error: any) {
                            setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
                          }
                        }
                      }}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {myRole !== 'LEADER' && (
            <button
              onClick={async () => {
                if (confirm('Voulez-vous vraiment quitter ce clan ?')) {
                  try {
                    await clanService.leave(myClan.id);
                    setMyClan(null);
                    setToast({ message: 'Clan quitté', type: 'info' });
                  } catch (error: any) {
                    setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
                  }
                }
              }}
              className="leave-btn"
            >
              Quitter le clan
            </button>
          )}
        </div>
      ) : (
        <div className="no-clan-section">
          <p>Vous n'êtes dans aucun clan.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="create-clan-btn"
          >
            ➕ Créer un clan
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Créer un clan</h2>
            <form onSubmit={handleCreateClan}>
              <div className="form-group">
                <label>Nom du clan *</label>
                <input type="text" name="name" required maxLength={50} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" maxLength={500} rows={3} />
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input type="text" name="city" maxLength={100} />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="cancel-btn">
                  Annuler
                </button>
                <button type="submit" className="confirm-btn">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showInviteModal && myClan && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Inviter un membre</h2>
            <div className="form-group">
              <label>Pseudo</label>
              <input
                type="text"
                value={inviteUsername}
                onChange={(e) => setInviteUsername(e.target.value)}
                placeholder="Entrez le pseudo"
              />
            </div>
            <div className="modal-actions">
              <button type="button" onClick={() => setShowInviteModal(false)} className="cancel-btn">
                Annuler
              </button>
              <button type="button" onClick={handleInvite} className="confirm-btn">
                Inviter
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

