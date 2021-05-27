import { Page } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { IconFlag2, IconListCheck, IconMap, IconUsers } from '@tabler/icons';
import cn from 'classnames';
import React from 'react';
import route from 'ziggy-js';
import { LocaleSwitch } from '../locale-switch';

export const Layout: React.FC = ({ children }) => {
    const { props } = usePage<Page<GlobalProps>>();
    return (
        <>
            <header className="navbar navbar-expand-md navbar-light d-print-none">
                <div className="container-xl">
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-menu"
                        aria-expanded="false"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <a href=".">VoteSwiper</a>
                    </h1>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item">
                            <LocaleSwitch locales={props.locales} />
                        </div>
                        <div className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link d-flex lh-1 text-reset p-0"
                                data-bs-toggle="dropdown"
                                aria-label="Open user menu"
                            >
                                <div className="d-none d-xl-block ps-2">
                                    <div>{props.user.name}</div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <a href="#" className="dropdown-item">
                                    Settings
                                </a>
                                <a href="#" className="dropdown-item">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="navbar-expand-md">
                <div className="navbar-collapse collapse" id="navbar-menu">
                    <div className="navbar navbar-light">
                        <div className="container-xl">
                            <ul className="navbar-nav">
                                <li
                                    className={cn(
                                        'nav-item',
                                        route()
                                            .current()
                                            .indexOf('admin.elections') > -1 &&
                                            'active'
                                    )}
                                >
                                    <InertiaLink
                                        href={route('admin.elections')}
                                        className="nav-link"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <IconListCheck size={24} />
                                        </span>
                                        <span className="nav-link-title">
                                            Elections
                                        </span>
                                    </InertiaLink>
                                </li>

                                <li
                                    className={cn(
                                        'nav-item',
                                        route()
                                            .current()
                                            .indexOf('admin.countries') > -1 &&
                                            'active'
                                    )}
                                >
                                    <InertiaLink
                                        href={route('admin.countries')}
                                        className="nav-link"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <IconMap size={24} />
                                        </span>
                                        <span className="nav-link-title">
                                            Countries
                                        </span>
                                    </InertiaLink>
                                </li>

                                <li
                                    className={cn(
                                        'nav-item',
                                        route()
                                            .current()
                                            .indexOf('admin.parties') > -1 &&
                                            'active'
                                    )}
                                >
                                    <InertiaLink
                                        href={route('admin.parties')}
                                        className="nav-link"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <IconFlag2 size={24} />
                                        </span>
                                        <span className="nav-link-title">
                                            Parties
                                        </span>
                                    </InertiaLink>
                                </li>

                                <li
                                    className={cn(
                                        'nav-item',
                                        route()
                                            .current()
                                            .indexOf('admin.users') > -1 &&
                                            'active'
                                    )}
                                >
                                    <InertiaLink
                                        href={route('admin.users')}
                                        className="nav-link"
                                    >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <IconUsers size={24} />
                                        </span>
                                        <span className="nav-link-title">
                                            Users
                                        </span>
                                    </InertiaLink>
                                </li>
                            </ul>
                            <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                                <form action="." method="get">
                                    <div className="input-icon">
                                        <span className="input-icon-addon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                ></path>
                                                <circle
                                                    cx="10"
                                                    cy="10"
                                                    r="7"
                                                ></circle>
                                                <line
                                                    x1="21"
                                                    y1="21"
                                                    x2="15"
                                                    y2="15"
                                                ></line>
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search…"
                                            aria-label="Search in website"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-wrapper">{children}</div>
        </>
    );
};
