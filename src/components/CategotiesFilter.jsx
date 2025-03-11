export const CategoriesFilter = ({ category, currentCategory, onClick }) => {
  return (
    <a
      data-cy="Category"
      className={`button mr-2 my-1 ${currentCategory === category.id ? 'is-info' : ''}`}
      href="#/"
      onClick={() => onClick(category.id)}
    >
      {category.title}
    </a>
  );
};
