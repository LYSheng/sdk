# Js sdk
使用文件说明：
jquery.min.js     jquery.qrcode.js   utf.js为生成二维码得必备js  sdk.js为调用数据生成二维码得方法   这四个js必须引入
index.js为你个人引用得js
    <template>
      <div class="multipleColumn">
        <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
        <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
        <div class="main"></div>
      </div>
	</template>
