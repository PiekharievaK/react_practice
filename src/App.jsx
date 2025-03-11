/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import { UsersFilter } from './components/UsersFilter';
import { CategoriesFilter } from './components/CategotiesFilter';
import { Product } from './components/Products';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    item => item.id === product.categoryId,
  );
  const user = usersFromServer.find(item => item.id === category.ownerId);

  return { ...product, category, user };
});

const filteredProducts = (
  list,
  userId,
  query,
  categoryId,
  sorted,
  isReverse,
) => {
  let visibleProducts = [...list];

  if (userId !== '') {
    visibleProducts = visibleProducts.filter(item => item.user.id === userId);
  }

  if (query !== '') {
    visibleProducts = visibleProducts.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (categoryId.length > 0) {
    visibleProducts = visibleProducts.filter(item => {
      return categoryId.includes(item.categoryId);
    });
  }

  // if (sorted) {
  //   visibleProducts = visibleProducts.sort((item1, item2) => item1 - item2);
  // }

  if (isReverse) {
    visibleProducts = visibleProducts.reverse();
  }

  return visibleProducts;
};

export const App = () => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [filterQuery, setFiterQuery] = useState('');
  const [currentCategories, setcurrentCategories] = useState([]);
  const [sort] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const visibleProducts = filteredProducts(
    products,
    currentUserId,
    filterQuery,
    currentCategories,
    sort,
    isReverse,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className={`panel-tabs has-text-weight-bold `}>
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={`panel-tabs has-text-weight-bold ${currentUserId === '' ? 'is-active' : ''}`}
                onClick={() => setCurrentUserId('')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <UsersFilter
                  user={user}
                  key={user.id}
                  currentUserId={currentUserId}
                  onClick={setCurrentUserId}
                />
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={filterQuery}
                  onChange={e => setFiterQuery(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {filterQuery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setFiterQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={`button is-success mr-6  ${currentCategories.length < 1 ? '' : 'is-outlined'} `}
                onClick={() => setcurrentCategories('')}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <CategoriesFilter
                  category={category}
                  key={category.id}
                  currentCategories={currentCategories}
                  onClick={setcurrentCategories}
                />
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setCurrentUserId('');
                  setFiterQuery('');
                  setcurrentCategories('');
                  setIsReverse(false);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length < 1 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(product => (
                  <Product product={product} key={product.id} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
