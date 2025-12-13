import { Link } from 'react-router-dom';
import './FloatingActionButton.css';

interface FloatingActionButtonProps {
  to?: string;
  onClick?: () => void;
  icon: string;
  label: string;
}

export default function FloatingActionButton({ to, onClick, icon, label }: FloatingActionButtonProps) {
  const content = (
    <div className="fab">
      <span className="fab-icon">{icon}</span>
      <span className="fab-label">{label}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="fab-link">{content}</Link>;
  }

  return (
    <button onClick={onClick} className="fab-button">
      {content}
    </button>
  );
}

