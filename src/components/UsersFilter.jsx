export const UsersFilter = ({ user, currentUserId, onClick }) => {
  return (
    <a
      data-cy="FilterUser"
      href="#/"
      onClick={() => onClick(user.id)}
      className={`${currentUserId === user.id ? 'is-active' : ''}`}
    >
      {user.name}
    </a>
  );
};
