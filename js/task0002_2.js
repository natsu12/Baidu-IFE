var oSubmitBtn = $('#submit');
var oResetBtn = $('#reset');
var oInput = $('#input');
var timer = -1;

function TimeCounter() {
  this.endTime = 0;
  this.elapsedTime = 0;
  this.errorMessage = "";

  if (typeof this.check != "function") {
    TimeCounter.prototype.init = function () {
      this.endTime = this.elapsedTime = 0;
      this.errorMessage = "";
    }

    TimeCounter.prototype.check = function () {
      var value = oInput.value;
      if (value.search(/^\d\d\d\d-\d\d-\d\d$/) == -1) {
        this.errorMessage = "请按照特定的格式YYYY-MM-DD输入";
      } else if (new Date(value).getDate() != value.substring(value.length-2)) {
        /* 判断是不是有效日期的方法：
         * 通过新建的Date对象(new Date(value))，可以识别出该日期是否正确，如果不正确则返回Invalid Date
         * 但当日期的值在1-31之间，new Date总返回一个新的对象（但它的“日”是不对的），
         * 所以要用getDate()方法获取“日”，来和原字符串最末两位比较
         */
        this.errorMessage = "请输入有效的日期";
      } else {
        var endTime = new Date(value + " 00:00:00");
        var elapsed = endTime.getTime() - Date.now();
        if (elapsed < 0) {
          this.errorMessage = "请输入未来的日期";
        } else {
          this.endTime = endTime;
        }
      }
    }

    TimeCounter.prototype.show = function () {
      $(".error")[0].innerHTML = this.errorMessage;
      if ($("#result")) {
        $("#input-area").removeChild($("#result"));
      }
      if (this.endTime) {
        this.elapsedTime = this.endTime.getTime() - Date.now();
        if (this.elapsedTime <= 0) {
          clearInterval(timer);
        }
        var oResult = document.createElement("p");
        oResult.id = "result";

        var year = this.endTime.getFullYear();
        var month = this.endTime.getMonth() + 1;
        var day = this.endTime.getDate();

        var temp = Math.floor(this.elapsedTime / 1000);
        var elapsedSeconds = temp % 60;
        temp = Math.floor(temp/60);
        var elapsedMinites = temp % 60;
        temp = Math.floor(temp/60);
        var elapsedHours = temp % 24;
        temp = Math.floor(temp/24);
        var elapsedDays = temp;
        oResult.innerHTML = "距离" + year + "年" + month + "月" + day + "日还有" +
                            elapsedDays + "天" + elapsedHours + "小时" +
                            elapsedMinites + "分" + elapsedSeconds + "秒";

        $("#input-area").appendChild(oResult);
      }
      

    }
  }
}

addClickEvent(oSubmitBtn, function () {
  clearInterval(timer);
  var timeCounter = new TimeCounter();
  timeCounter.init();
  timeCounter.check();
  timeCounter.show();
  // setInterval的作用域是全局，this指向window，需要用bind方法将this绑定到timeCounter
  timer = setInterval(timeCounter.show.bind(timeCounter), 1000);
});

addClickEvent(oResetBtn, function () {
  clearInterval(timer);
  oInput.value = "";
  $(".error")[0].innerHTML = "";
  if ($("#result")) {
    $("#input-area").removeChild($("#result"));
  }
});
