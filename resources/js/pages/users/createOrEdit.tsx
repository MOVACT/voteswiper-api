import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import Input from '../../components/form/input';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props {
    edit_user?: {
        name: string;
        email: string;
        id: number;
    };
}

const UserCreateOrEdit: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { data, setData, post, put, processing, errors } = useForm({
        name: props.edit_user ? props.edit_user.name : '',
        email: props.edit_user ? props.edit_user.email : '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (props.edit_user) {
            put(route('admin.users.update', { user: props.edit_user.id }));
            return;
        }

        post(route('admin.users.store'));
    };

    return (
        <Page
            title={
                props.edit_user
                    ? `Edit user ${props.edit_user.name}`
                    : 'Add new User'
            }
        >
            <Helmet title={props.edit_user ? 'Edit User' : 'Create User'} />
            <form
                onSubmit={submit}
                action={
                    props.edit_user
                        ? route('admin.users.update', {
                              user: props.edit_user.id,
                          })
                        : route('admin.users.store')
                }
                method="post"
            >
                <div className="row row-cards">
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <Input
                                    error={!!errors.name}
                                    helperText={errors.name ?? undefined}
                                    required
                                    disabled={processing}
                                    id="name"
                                    label="Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />

                                <Input
                                    error={!!errors.email}
                                    helperText={errors.email ?? undefined}
                                    required
                                    disabled={processing}
                                    id="email"
                                    label="E-Mail"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                            </div>
                            <div className="card-footer text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary ms-auto"
                                    disabled={processing}
                                >
                                    Save user
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
};

UserCreateOrEdit.layout = (page) => <Layout>{page}</Layout>;

export default UserCreateOrEdit;
