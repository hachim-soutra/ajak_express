import ApiService from "@/services/api.service";
export const clientsMixin = {
    mounted() {
      ApiService.get(`${this.$app_url}/api/auth/client-list`)
        .then((res) => {
            this.clients = res.data.data.data;
            console.log(this.clients);
        })
        .catch((err) => console.log(err));
    },
    data() {
        return {
            clients: []
        }
    }
    
}