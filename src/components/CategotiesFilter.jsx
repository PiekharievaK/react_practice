export const CategoriesFilter = ({ category, currentCategory, onClick }) => {
  return (
    <a
      data-cy="Category"
      className={`button mr-2 my-1 ${currentCategory.includes(category.id) ? 'is-info' : ''}`}
      href="#/"
      onClick={() =>
        onClick(prev => {
          if (prev.includes(category.id)) {
            return prev.filter(item => item !== category.id);
          }

          return [...prev, category.id];
        })
      }
    >
      {category.title}
    </a>
  );
};
