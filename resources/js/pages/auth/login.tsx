// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import Input from '../../components/form/input';

const Login: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="page page-center">
            <Helmet title="Login" />
            <div className="container-tight py-4">
                <div className="text-center mb-4">
                    <h1>VoteSwiper</h1>
                </div>

                <form
                    className="card card-md"
                    noValidate
                    onSubmit={submit}
                    action={route('login')}
                >
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">
                            Login to your account
                        </h2>

                        <Input
                            error={!!errors.email}
                            helperText={errors.email ?? undefined}
                            required
                            disabled={processing}
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />

                        <Input
                            error={!!errors.password}
                            helperText={errors.password ?? undefined}
                            required
                            disabled={processing}
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <div className="form-footer">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={processing}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>

                <div className="text-center text-muted mt-3">
                    <InertiaLink href={route('password.request')}>
                        Forgot password?
                    </InertiaLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
