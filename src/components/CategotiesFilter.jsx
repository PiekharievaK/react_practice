export const CategoriesFilter = ({ category, currentCategories, onClick }) => {
  const isInclude = currentCategories.includes(category.id);

  return (
    <a
      data-cy="Category"
      className={`button mr-2 my-1 ${isInclude ? 'is-info' : ''}`}
      href="#/"
      onClick={() =>
        onClick(prev => {
          if (isInclude) {
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
