<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件委托,离开父亲的时候才会消失 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <!-- 鼠标进入的时候是否展示 @mouseenter="changeShow"-->
                <h2 class="all" >全部商品分类</h2>
                <!-- show 默认显示 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委派+编程式导航实现路由的跳转 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)" >
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}--{{index}}</a>
                                </h3>
                                <!-- 鼠标移进谁就展示二三级分类，通过JS实现动态行内样式，进行二级、三级分类的显示与隐藏(display:none|block切换的) -->
                                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <!--二级分类-->
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <!--三级分类-->
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                
               
            </div>
            
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>

</template>

<script>
// import store from '@/store';
// 按需引入 lodash(默认导出就不用加大括号引入)
import throttle from 'lodash/throttle'
import { mapState } from 'vuex';
export default {
    data() {
        return {
        //利用响应式属性,将来存储用户鼠标进入哪一个一级分类的索引值
        currentIndex: -1,
        show: true, //默认显示
        }
    },
    // 组件挂载完毕，可以向服务器发请求
    mounted(){
        // 通知Vuex发请求(操作调用actions的categoryList)，获取数据，并存储于仓库中
        this.$store.dispatch('getCategoryList') 
        //派发action
        //路由切换的时候,路由组件会被销毁重建【子组件不也是】
        if (this.$route.path != "/home") {
        this.show = false
        }
    },
    computed: {
        ...mapState({
            categoryList:(state)=>{
                return state.home.category // 从仓库中获取数据（也可以上面直接store
            }
        })
        
    },
    methods: {
        // changeIndex(index){ // 鼠标进入
        //     this.currentIndex=index
        //     // console.log(index)
        // },
        // 节流（固定时间触发一次）
        changeIndex: throttle(function(index) { // throttle别用箭头函数，可能出现上下文this
            this.currentIndex = index
        }, 100),
        // leaveIndex(){
        //     this.currentIndex = -1
        // },
        // //全部商品分类鼠标进入
        // changeShow() {
        //     //鼠标进入:在search路由下,在修改数据
        //     if (this.$route.path != "/home") {
        //         this.show = true;
        //     }
        // },
        goSearch(event) {
            let element = event.target
            // console.log('element.dataset',element.dataset)
            let { categoryname,category1id,category2id,category3id } = element.dataset
            // 如果标签身上有categoryname一定是a标签
            if(categoryname) {
                let locations = { name: 'search', query: { categoryName: categoryname }}
                let query = { categoryName: categoryname}
                // 区分一级分类，二级分类，三级分类的a标签，另一个自定义属性
                // console.log(categoryname,category1id,category2id,category3id)
                if(category1id) {
                    query.category1Id = category1id
                } else if(category2id){
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                locations.query = query
                //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
                if (this.$route.params.keyword) { // 只有搜索框的时候才会走这里params里面才有keyword
                    
                    locations.params = this.$route.params;
                    console.log(locations.query)
                    console.log(this.$route.params)
                }
                //目前商品分类这里携带参数只有query参数
                this.$router.push(locations);

            }
        },
        // 当鼠标移入的时候，让商品列表进行展示
        enterShow(){
            this.show = true
        },
        // 当鼠标离开的时候，让商品列表进行隐藏
        leaveShow(){
            this.currentIndex = -1 // 背景首先去掉
            if (this.$route.path != "/home") {
                this.show = false
            }
        }
    },

    

}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
            
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
                .cur{
                    background-color: skyblue;
                }
            }
        }

        // 过渡动画的样式
        // 进入的状态
        .sort-enter { /*开始的时候*/
            height: 0px;
            transform: rotate(0deg);
          }
      
        .sort-enter-active {
        transition: all 1s linear;
        }
        .sort-enter-to { /*结束的时候*/
        height: 461px;
        transform: rotate(360deg);
        }
    }
}
</style>