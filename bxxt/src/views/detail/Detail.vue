<template>
  <div class="detail">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>详情</template>
    </nav-bar>
    <div class="detail-body">
      <van-cell-group inset class="repairs-info">
        <van-cell title="报修信息" />
        <van-cell title="单号" :value="formData.id" />
        <van-cell title="姓名" :value="formData.name" />
        <van-cell title="工号" :value="formData.repairsUser" />
        <van-cell title="电话" :value="formData.tel" />
        <van-cell title="提报时间" :value="formData.createTime" />
        <van-cell title="报修项" :value="formData.reportContent" />
        <van-cell title="地点" :value="formData.dormitory" />
        <van-cell title="故障描述" :value="formData.message" />
      </van-cell-group>
      <van-cell-group inset class="flow-info">
        <van-cell title="报修图片" />
        <div class="upimg-list">
          <van-image v-for="(item, index) in imageList" :key="item" width="100" height="100" :src="item" lazy-load
            @click="sceneImg(index)" />
        </div>
      </van-cell-group>

      <van-cell-group inset class="repairs-info">
        <van-cell title="维修信息" />
        <van-cell title="工号" :value="formData.pickUser" />
        <van-cell title="接单时间" :value="formData.acceptTime" />
        <van-cell title="完成时间" :value="formData.endTime" />
        <van-cell title="维修材料" :value="formData.usedMaterial" />
        <van-cell title="材料备注" :value="formData.usedDetail" />
      </van-cell-group>

      <van-form @submit="onSubmit">
        <van-cell-group inset class="flow-info" v-if="formData.staus === 2">
          <van-cell title="维修图片" />
          <div class="upimg-list">
            <van-image v-for="(item, index) in repairImageList" :key="item" width="100" height="100" :src="item"
              lazy-load @click="sceneRepairImage(index)" />
          </div>
        </van-cell-group>

        <van-cell-group inset class="flow-info" v-if="formData.staus === 1 && user.identity == 0">
          <van-field v-model="updateFormData.usedMaterial" is-link readonly label="使用材料" placeholder="请选择使用材料"
            @click="showMaterial = true" :rules="[{ required: true, message: '请选择您使用的材料' }]" />

          <van-field v-model="updateFormData.usedDetail" name="材料备注" label="材料备注" placeholder="具体使用材料" />

          <van-popup v-model:show="showMaterial" round position="bottom">
            <van-cascader v-model="materialItem" title="请选择使用的材料" :options="materialOptions"
              @close="showMaterial = false" @finish="onFinishMaterial" />
          </van-popup>
          <van-uploader class="upload" v-model="fileList" multiple />
        </van-cell-group>

        <div style="margin: 16px" v-if="formData.staus === 0 && user.identity == 0">
          <van-button round block type="primary" color="#44b883" @click="acceptSubmit">
            接单
          </van-button>
        </div>
        <div style="margin: 16px" v-else-if="formData.staus === 1 && user.identity == 0">
          <van-button round block type="primary" color="#44b883" native-type="submit">
            处理完成
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {
  getDetail,
  setStaus,
  updateAcceptData,
  upLoad,
  updateForm,
} from "network/form";
import { getMaterialOption } from "network/option";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, toRefs, onMounted } from "vue";
import moment from "moment";
import { Dialog, ImagePreview, Toast } from "vant";
import { useStore } from "vuex";
import { formatDate } from "utils/Time";

export default {
  name: "Detail",
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();
    let data = reactive({
      formData: {},
      updateFormData: {
        endImagesUrl: "",
        usedMaterial: "",
        endTime: "",
        usedDetail: "",
        id: "",
        pickUser: "",
      },
    });
    const route = useRoute();
    const router = useRouter();
    let id = ref(0);
    id.value = route.query.id;
    data.updateFormData.id = id;

    const materialItem = ref("");
    const showMaterial = ref(false);
    let materialOptions = ref([]);

    const onFinishMaterial = ({ selectedOptions }) => {
      showMaterial.value = false;
      data.updateFormData.usedMaterial = selectedOptions
        .map((option) => option.text)
        .join("/");
    };

    let imageList = ref([]);
    let repairImageList = ref([]);

    // 维修工上传图片列表
    const fileList = ref([]);
    let imagesUrl = ref("");

    const sceneImg = (index) => {
      ImagePreview({
        images: imageList.value,
        startPosition: index,
      });
    };

    const sceneRepairImage = (index) => {
      ImagePreview({
        images: repairImageList.value,
        startPosition: index,
      });
    };

    onMounted(() => {
      getDetail(id.value).then((res) => {
        data.formData = res.data;
        data.formData["createTime"] = moment(
          data.formData["createTime"]
        ).format("YYYY-MM-DD HH:mm");
        if (data.formData["acceptTime"]) {
          data.formData["acceptTime"] = moment(
            data.formData["acceptTime"]
          ).format("YYYY-MM-DD HH:mm");
        }
        if (data.formData["endTime"]) {
          data.formData["endTime"] = moment(data.formData["endTime"]).format(
            "YYYY-MM-DD HH:mm"
          );
        }
        if (data.formData["endImagesUrl"]) {
          repairImageList.value = data.formData.endImagesUrl.split(",");
        }
        if (data.formData["imagesUrl"]) {
          console.log(data.formData.imagesUrl)
          imageList.value = data.formData.imagesUrl.split(",");
          imageList.value.map(v => {
            console.log(v);
          })
        }
      });
      getMaterialOption().then(({ data }) => {
        materialOptions.value = data;
      });
    });

    const acceptSubmit = () => {
      Toast.loading({
        duration: 0,
        message: "接单中...",
        forbidClick: true,
      });
      const acceptData = reactive({
        id: id.value,
        acceptTime: formatDate(),
        pickUser: store.state.user.username,
      });
      updateAcceptData(acceptData).then((res) => { });
      setStaus(1, id.value).then((res) => {
        Toast.clear();
        Toast.success("接单成功！");
        router.replace({ path: "/show" });
      });
    };

    const onSubmit = () => {
      let endImages = new FormData();
      for (let i = 0; i < fileList.value.length; i++) {
        endImages.append("images", fileList.value[i].file);
      }
      Dialog.confirm({
        title: "确认提交",
        message: "是否确认提交，一旦提交无法撤回！",
      }).then(async () => {
        Toast.loading({
          duration: 0,
          message: "提交中...",
          forbidClick: true,
        });
        await upLoad(endImages).then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            imagesUrl.value +=
              data[i].destination.replace(".", "api") +
              "/" +
              data[i].filename +
              ",";
          }
          if (imagesUrl.value.length > 0) {
            imagesUrl.value = imagesUrl.value.substr(
              0,
              imagesUrl.value.length - 1
            );
          }
          console.log(imagesUrl.value);
        });

        data.updateFormData["endImagesUrl"] = imagesUrl.value;
        data.updateFormData["endTime"] = formatDate();
        updateForm(data.updateFormData).then((res) => {
          setStaus(2, id.value).then((res) => {
            Toast.clear();
            Toast.success("提交完成！");
            router.replace({ path: "/show" });
          });
        }).catch(() => {
          Toast.clear();
          Toast.fail("提交失败！");
        })
      });
    };

    return {
      materialItem,
      showMaterial,
      onFinishMaterial,
      materialOptions,
      ...toRefs(data),
      ...toRefs(store.state),
      onSubmit,
      acceptSubmit,
      imageList,
      repairImageList,
      sceneImg,
      sceneRepairImage,
      fileList,
    };
  },
};
</script>

<style>
.detail-body {
  margin-top: 50px;
  margin-bottom: 50px;
}

.van-cell__value {
  text-align: left;
}

.upload {
  margin-top: 5px;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}

.repairs-info {
  margin-top: 5px;
}

.flow-info {
  margin-top: 5px;
}

.upimg-list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}

.van-image {
  margin: 5px;
}
</style>