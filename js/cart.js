/**
 * Created by jacksoft on 16/10/22.
 */

window.vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        checkAll: false,
        shows: false,
    },
    mounted: function() {
        this.cartView();
        this.cattotalMoney();
    },
	//过滤器
	filters: {
		formatMoney: function (value,quentity) {
			if(!quentity)quentity=1;
			return "¥ "+(value*quentity).toFixed(2) +"元";
		}
	},

    methods: {
		//计算总钱数
        cattotalMoney() {
            let totalMoney = 0;
            this.productList.forEach(function(item) {
                if (item.checked) {
                    totalMoney += item.productPrice * item.productQuentity;
                }
            });
            this.totalMoney = totalMoney;
        },

		//全选
        selectAll(isCheck) {
            this.checkAll = isCheck;
            this.productList.forEach(function(item) {
                if (typeof item.checked == "undefined") {
                    Vue.set(item, "checked", isCheck);
                } else {
                    item.checked = isCheck;
                }
            })
            this.cattotalMoney();
        },

		//单选
        selsecitem(items) {
            if (typeof items.checked == 'undefined') {
                this.$set(items, "checked", true);
            } else {
                items.checked = !items.checked;
            }
            this.cattotalMoney();
        },

		//数量操作
        add(items, way) {
            if (way > 0) {
                items.productQuentity++;
            } else {
                items.productQuentity--;
                if (items.productQuentity < 0) {
                    items.productQuentity = 0;
                }
            }
            this.cattotalMoney();
        },

		//获取数据
        cartView() {
            this.$http.get("data/cartData.json").then(response => {
                var res = response.data;
                if (res && res.status == "1") {
                    this.productList = res.result.list;
                }
            });
        },
     
        del(items) {
            this.shows = true;
        },
		close(){
			this.shows = false;
		},
		delss(){
			this.shows = false;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index,1);
		},

    },
});