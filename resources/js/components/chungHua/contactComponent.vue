<template>
    <div>
        <div class="es-alphabet">
            <div>
                <label :title="key"  v-for="(value, key) in grouped" :key="key"><a :href="`#${key}`">{{key}}</a></label>
                <!-- <a :href="`#${key}`"></a> -->
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
                                 <Checkbox v-model="contact.isSelected"></Checkbox>
                                <Avatar src="contact.userAvatar" v-if="contact.userAvatar" />
                                <Avatar icon="ios-person" v-else/>
                                <div class="es-item-info">
                                    <div class="title">{{contact.name}}</div>
                                    <div class="main">{{contact.phoneNumber}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="es-model-operate">
            <Button type="primary" @click="submit">提交</Button>
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
            if(userInfo.isSelected == undefined){
                this.$set(userInfo,'isSelected',true)
            }else{
                userInfo.isSelected = !userInfo.isSelected
            }
            if(userInfo.isSelected == true){
                this.selUsers.push(`${userInfo.name}`)
            }else{
                this.selUsers.pop(`${userInfo.name}`)
            }
        },
        submit(){

            this.$emit('selectedUser',this.selUsers)
            // this.$router.push({path:this.$route.path,query:{questionType:'短信'}})
            if(this.currentPath.query.questionType == '评价'){
                this.$router.push({path:this.currentPath.path,query:{questionType:this.currentPath.query.questionType,selType:'student'}})
            }else{
                this.$router.push({path:`${this.$route.path}?questionType=${this.currentPath.query.questionType}`})
            }
        }
    }
}
</script>