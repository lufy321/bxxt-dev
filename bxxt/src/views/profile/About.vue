<template>
    <div class="about">
        <nav-bar>
            <template v-slot:left></template>
            <template v-slot:default>关于我们</template>
        </nav-bar>

        <ul class="about-list">
            <li class="van-hairline--bottom">
                <span>研发团队：宁夏建龙信息化室</span>
            </li>
        </ul>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
    name: "Profile",
    components: {
        NavBar
    },
    setup() {

        return {
        }
    }
}
</script>

<style scoped lang="scss">
.about {
    margin: 60px 10px 0px;

    .about-list {

        font-size: 14px;

        .van-hairline--bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 45px;
        }
    }
}
</style>