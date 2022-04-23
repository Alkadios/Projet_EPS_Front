import { computed } from 'vue';
import { useStore } from 'vuex';

export default function UserService() {
    const store = useStore();

    async function saveUser(

        id: number,
        email: string,
        roles: string,
        password: string,

    ) {
        await store.dispatch('UserModule/saveUser', {
            id,
            email,
            roles,
            password,

        });
    }

    return {
        saveUser,
    };
}
