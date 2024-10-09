
import PropTypes from 'prop-types';
import './TaskProgress.css';

const TaskProgress = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Calcul du pourcentage de tâches complètes
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    return (
        <div className="task-progress">
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="45" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#A7001E" // Couleur pour la jauge remplie
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${percentage * 2.83} ${283 - percentage * 2.83}`} // 2 * PI * r = 2 * 3.14 * 45 = 282.6
                    style={{ transition: 'stroke-dasharray 0.5s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} // Ajustement de la rotation
                />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="18" fill="#333">
                    {Math.round(percentage)}%
                </text>
            </svg>
            <p>{completedTasks} sur {totalTasks} tâches complètes</p>
        </div>
    );
};

TaskProgress.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default TaskProgress;
