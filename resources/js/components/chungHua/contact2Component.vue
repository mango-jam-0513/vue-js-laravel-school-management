<template>
    <div>
        <div class="es-alphabet">
            <div>
                <label :title="key"  v-for="(value, key) in grouped" :key="key"><a :href="`#${key}`">{{key}}</a></label>
            </div>
        </div>
        <div v-for="(value, key) in grouped" :key="key">
            <div class="category-title">
                <span :id="key">{{ key }}</span>
            </div>
            <div v-for="(contactName,i) in value" :key="i">
                <div v-for="(contact,j) in contacts" :key="j">
                    <div v-if="contact.name == contactName.name">
                        <div class="es-item" @click="selUser(contact)">
                            <div class="es-item-left">
                                <Avatar :src="contact.userAvatar" v-if="contact.userAvatar" />
                                <Avatar icon="ios-person" v-else/>
                                <div class="es-item-info">
                                    <div class="title">{{contact.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lodash from 'lodash';
export default {
    data(){
        return{
            contacts:[],
            contactsName:[],
            selUsers:[],
            isLoading:false,
        }
    },
    async created(){
        const con = await this.callApi('get','/api/contact');
        if(con.status == 200){
            this.contacts = con.data.user;
            this.contactsName = con.data.userName;
        }
    },
    computed:{
        grouped(){
            return lodash.groupBy(this.contactsName,(item)=>{
                return item.name.charAt(0)
            })
        },
        currentPath(){
            return this.$route
        }
    },
    methods:{
        selUser(userInfo){
            this.$emit('selectedUser',userInfo)
            if(this.currentPath.query.addQuestion  = "classPresident"){
                this.$router.push({path:this.currentPath.path,query:{questionType:this.currentPath.query.questionType,addQuestion:'publishingRules'}})
            }else{
                this.$router.push({path:`${this.$route.path}?questionType=${this.currentPath.query.questionType}`})
            }
        },
    }
}
</script>