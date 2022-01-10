const STORAGE_KEY_ONE = 'ADD-MYAPP-KEY-ONE';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 提示文字
    text: {
      type: String,
      value: '「添加小程序」访问更便捷!'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    SHOW_TOP: false,
    SHOW_TOP_key: 1,
    marRight: 66
  },
  ready: function () {
    this.initTips();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initTips: function () {
      // 判断是否已经显示过
      let cacheOne = wx.getStorageSync(STORAGE_KEY_ONE);
      const now = +new Date();
      // 校验缓存数据 以及缓存时间是否过期(关闭后缓存一个月 一个月后重新提示用户)
      if (cacheOne && (now - cacheOne < 30 * 24 * 3600000)) return;
      // 处理根据系统信息处理位移箭头位置（重点）
      let systemInfo = wx.getSystemInfoSync();
      let client = wx.getMenuButtonBoundingClientRect();
      if (systemInfo && client) {
        this.setData({
          marRight: systemInfo.screenWidth - client.left - 28
        });
      }
      // 没显示过，则进行展示
      this.setData({
        SHOW_TOP: true
      });
    },
    // 显示全屏添加说明
    showModal: function () {
      this.setData({
        SHOW_TOP: false,
        SHOW_MODAL: true
      });
    },
    okHandler: function () {
      const storage_key  = this.data.SHOW_TOP_key;
      let key = STORAGE_KEY_ONE;
      this.setData({
        SHOW_TOP: false
      });
      wx.setStorage({
        key,
        data: + new Date,
      });
    }
  }
})