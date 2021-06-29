// adds userid as a computed property, which contains id of current logged in user or 0 if not logged in

export default {
    computed: {
        userid() {
            const user = this.$store.state.user.user;
            return user === undefined ? 0 : user.id;
        },
        username() {
            const user = this.$store.state.user.user;
            return user === undefined ? "Guest" : user.name;
        },
        affiliation() {
            const user = this.$store.state.user.user;
            return user === undefined ? "Guest" : user.affiliation;
        },
    },
};