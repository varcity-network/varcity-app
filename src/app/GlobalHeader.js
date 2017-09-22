import React from 'react';
import { Link } from 'react-router-dom';

export default function GlobalHeader({ authId, search, signOut }) {
  return (
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        {authId &&
        Object.entries(authId).length !== 0 && (
          <div>
            <div>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  const form = event.target;
                  signOut({
                    payload: { payload: null }
                  });
                  form.reset();
                }}>
                <button
                  className="button is-primary is-outlined"
                  type="submit"
                  name="submit">
                  Logout
                </button>
              </form>
            </div>
            <div>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  const form = event.target;
                  const { searchValue } = form.elements;
                  search({
                    payload: { payload: searchValue.value }
                  });
                  form.reset();
                }}>
                <input name="searchValue" />
                <button
                  className="button is-primary is-outlined"
                  type="submit"
                  name="submit">
                  Search{' '}
                </button>
              </form>
            </div>
            <div className="">
              <Link to={`/athletes/${authId}`}>My Profile</Link>
            </div>
          </div>
        )}
      </div>

      <ul>
        <li>
          <Link to="/">
            <i className="fa fa-home fa-2x" />
          </Link>
        </li>
        <li />
        <li>
          <Link to="/about">About</Link>
        </li>

        <li />
        <li />
      </ul>
    </div>
  );
}
