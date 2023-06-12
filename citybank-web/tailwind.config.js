/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./node_modules/flowbite/**/*.js"],
  mode: "jit",
  theme: {
    extend: {
      

      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        shallowCloud: "#EAEEF1", //浅云
        suCai: "#D4DDE1", //素采
        taJian: "#151D29", //獭见
        jiLan: "#3C4654", //霁蓝
        yuYangRan: "#576470", //育阳染
        shanFan: "#F5F3F2", //山矾
        gaoYu: "#EFEFEF", //缟羽
        luoShenZhu: "#D23918", //洛神珠
        juYi: "#D3A237", //鞠衣
        cuiWei: "#4C8045", //翠微
        rouLan: "#106898", //柔蓝
        biCheng: "#12507B", //碧城
        youTanRui: "#615EA8", //优昙瑞
        tangLiHe: "#955A42", //棠梨褐
        ruanCui: "#006D87", //软翠
        
        huangSuLiu: "#FEDC5E", //黄粟留

        biShan: "#779649", //碧山
        zhuCao: "#A64036", //朱草

        zengQing: "#535164", //曾青
        guanLv: "#2A6E3F", //官绿
        diShiQing: "#003460", //帝释青
        lanCaiHe: "#06436F", //蓝采和
        tianShuiBi: "#5AA4AE", //天水碧

        qiGu: "#5D8351", //漆姑
        shiFa: "#6A8D52", //石发
        chunChen: "#A9BE7B", //春辰

        youTanRui: "#615EA8", //优昙瑞
        meiMei: "#4E8548", //莓莓

        woZhu: "#DD6B7B", //渥赭

        cangJia: "#A8BF8F", //苍葭
        tingWuLv: "#68945C", //庭芜绿

        weiHong: "#A73766", //魏红

        kuJin: "#E18A3B", //库金

        queMei: "#788A6F", //雀梅

        ziBoHan: "#BBA1CB", //紫薄汗

        ziPu: "#A6559D", //紫蒲

        songHua: "#FFEE6F", //松花

        xiangYe: "#ECD452", //缃叶
        
        
        qingMing: "#3271AE", //青冥
        shuiLongYin: "#84A729", //水龙吟
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Aldrich: ["Aldrich", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [

    require('flowbite/plugin')

  ],
};




// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

