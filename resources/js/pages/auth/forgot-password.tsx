// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import Input from '../../components/form/input';

const ForgotPassword: React.FC = () => {
    const [successMessage, showSuccessMessage] = React.useState<boolean>(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => {
                showSuccessMessage(true);
            },
        });
    };

    return (
        <div className="page page-center">
            <Helmet title="Forgot password" />
            <div className="container-tight py-4">
                <form
                    className="card card-md"
                    noValidate
                    onSubmit={submit}
                    action={route('password.email')}
                >
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">
                            Reset your password
                        </h2>

                        {successMessage && (
                            <div className="alert alert-success">
                                Please check your email inbox and click the link
                                to reset your password.
                            </div>
                        )}

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

export default ForgotPassword;
