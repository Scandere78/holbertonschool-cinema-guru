import './components.css';

function Activity({ activity }) {
  return (
    <li className="activity">
      <p>
        {activity.title} - {activity.type}
      </p>
    </li>
  );
}

export default Activity;
