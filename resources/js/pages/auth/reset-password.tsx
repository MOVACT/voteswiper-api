import { Page } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import Input from '../../components/form/input';

interface Props extends GlobalProps {
    email: string;
    token: string;
}

const ResetPassword: React.FC = () => {
    const { props } = usePage<Page<Props>>();

    const [successMessage, showSuccessMessage] = React.useState<boolean>(false);
    const { data, setData, post, processing, errors } = useForm({
        email: props.email,
        token: props.token,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(route('password.update'), {
            onSuccess: () => {
                showSuccessMessage(true);
            },
        });
    };

    return (
        <div className="page page-center">
            <Helmet title="Reset password" />
            <div className="container-tight py-4">
                <form
                    className="card card-md"
                    noValidate
                    onSubmit={submit}
                    action={route('password.update')}
                >
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">
                            Reset your password
                        </h2>

                        {successMessage && (
                            <div className="alert alert-success">
                                Your password has been changed. You can now{' '}
                                <InertiaLink href={route('login')}>
                                    login
                                </InertiaLink>
                                .
                            </div>
                        )}

                        <Input
                            error={!!errors.password}
                            helperText={errors.password ?? undefined}
                            type="password"
                            required
                            disabled={processing}
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            label="New Password"
                            name="password"
                            autoComplete="new-password"
                        />

                        <Input
                            error={!!errors.password_confirmation}
                            helperText={
                                errors.password_confirmation ?? undefined
                            }
                            type="password"
                            required
                            disabled={processing}
                            id="passpassword_confirmationword"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            label="Confirm Password"
                            name="password_confirmation"
                            autoComplete="confirm-password"
                        />

                        <div className="form-footer">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={processing}
                            >
                                Reset password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
