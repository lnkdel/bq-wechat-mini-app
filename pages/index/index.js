//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    motto: '',    
    isHidden: true,
    isShowShowMore: false,
    showMore: '查看更多',
    list: [],
    buttonText: '点我扫描',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  toggle_show_more: function(){
    if(this.data.isHidden){
      this.setData({ showMore: '收起', isHidden: false});      
    }else{
      this.setData({ showMore: '查看更多', isHidden: true });
    }

  },
  click_me: function(){    
    wx.scanCode({
      onlyFromCamera:false,
      scanType: ['qrCode','barCode'],
      success: (scanRes) => {
        var ita_no = scanRes.result;
        let that = this;
        const url = util.apiGetAsset;
        this.setData({ isShowShowMore: false})
        var params = {
          "ita_no": ita_no,
        }
        util.serverRequest(url, params).then(res => {
          var result = res.data.result
          console.log(res.data.result)
          if (result) {
            console.log(result.code)
            console.log(result.asset)
            if(result.code==0){
              that.setData({
                list: [
                  ['资产编号', result.asset.asset_no],
                  ['品牌', result.asset.brand_name],
                  ['型号', result.asset.model_name],
                  ['类型', result.asset.category_name],
                  ['S/N', result.asset.serial_no],
                  ['MAC地址', result.asset.mac_addresses],
                  ['IP', result.asset.ip],
                  ['P/N', result.asset.pin],
                  ['位置', result.asset.location],
                  ['责任人', result.asset.employee],
                  ['原厂质保期限(月)', result.asset.original_warranty_months],
                  ['原厂质保开始日期', result.asset.original_warranty_start_date],
                  ['原厂质保结束日期', result.asset.original_warranty_end_date],
                  ['原厂保修电话', result.asset.original_warranty_number],
                  ['供应商质保期限(月)', result.asset.supplier_warranty_months],
                  ['供应商质保开始日期', result.asset.supplier_warranty_start_date],
                  ['供应商质保结束日期', result.asset.supplier_warranty_end_date],
                  ['续保方式', result.asset.renewal_method],
                  ['供应商', result.asset.supplier],
                  ['供应商联系人', result.asset.supplier_contact],
                  ['合同号', result.asset.contract_no],
                  ['供应商电话', result.asset.supplier_number],
                  ['备注', result.asset.remark]
                ],
                isShowShowMore: true,
                motto: '资产编号：  ' + result.asset.asset_no + '\r\n' 
                  + '品牌：  ' + result.asset.brand_name + '\r\n' 
                  + '型号：  ' + result.asset.model_name +'\r\n'
                  + '类型：  ' + result.asset.category_name + '\r\n'
                  + 'S/N：  ' + result.asset.serial_no + '\r\n'
                  + 'MAC地址：  ' + result.asset.mac_addresses + '\r\n'
                  + 'IP：  ' + result.asset.ip + '\r\n'
                  + 'P/N：  ' + result.asset.pin + '\r\n'
                  + '位置：  ' + result.asset.location + '\r\n'
                  + '责任人：  ' + result.asset.employee + '\r\n'
                  + '原厂质保期限(月)：  ' + result.asset.original_warranty_months + '\r\n'
                  + '原厂质保开始日期：  ' + result.asset.original_warranty_start_date + '\r\n'
                  + '原厂质保结束日期：  ' + result.asset.original_warranty_end_date + '\r\n'
                  + '原厂保修电话：  ' + result.asset.original_warranty_number + '\r\n'
                  + '供应商质保期限(月)：  ' + result.asset.supplier_warranty_months + '\r\n'
                  + '供应商质保开始日期：  ' + result.asset.supplier_warranty_start_date + '\r\n'
                  + '供应商质保结束日期：  ' + result.asset.supplier_warranty_end_date + '\r\n'
                  + '续保方式：  ' + result.asset.renewal_method + '\r\n'
                  + '供应商：  ' + result.asset.supplier + '\r\n'
                  + '供应商联系人：  ' + result.asset.supplier_contact + '\r\n'
                  + '合同号：  ' + result.asset.contract_no + '\r\n'
                  + '供应商电话：  ' + result.asset.supplier_number + '\r\n'
                  + '备注：  ' + result.asset.remark
              })
            }else{
              that.setData({
                motto: result.message
              })
            }            
          }
          else {
            wx.showModal({
              title: '错误信息',
              content: '未能获取首页信息',
              showCancel: false,
            })
          }
        })
        //this.setData({ motto: res.result })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
