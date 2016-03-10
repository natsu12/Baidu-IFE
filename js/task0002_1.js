var oSubmitBtn = $('#submit');
var oResetBtn = $('#reset');
var oInput = $('#input');

function Interest() {
  this.values = [];
  this.errorMessage = "";
  if (typeof this.getInputValue != "function") {

    Interest.prototype.getInputValue = function () {
      // \s包括空格和换行
      this.values = oInput.value.replace(/[\s,，、;；]+/g, ',').split(',');
    }

    Interest.prototype.filter = function () {
      var obj = {}, arr = this.values;
      each(arr, function (item) {
        if (item) {
          obj[item] = true;
        }
      })
      this.values = Object.keys(obj);
    }

    Interest.prototype.show = function () {
      $(".error")[0].innerHTML = this.errorMessage;

      if (!this.errorMessage) {
        if ($("#result")) {
          $("#input-area").removeChild($("#result"));
        }
        oInput.value = "";

        var oResult = document.createElement("div");
        oResult.id = "result";

        var h3 = document.createElement("h3");
        h3.innerHTML = "爱好：";
        oResult.appendChild(h3);

        each(this.values, function (item) {
          var checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = item;
          oResult.appendChild(checkbox);
          var text = document.createElement("label");
          text.innerHTML = item;
          text.className = "interest";
          text.htmlFor = item;
          oResult.appendChild(text);
        });
        $("#input-area").appendChild(oResult);
      }
    }

    Interest.prototype.check = function () {
      this.errorMessage = "";
      if (this.values.length > 10) {
        this.errorMessage = "输入的爱好数量不能超过10个";
      } else if (!this.values.length) {
        this.errorMessage = "至少输入1个爱好";
      }
    }
  }
}

oSubmitBtn.addEventListener("click", function () {
  var interest = new Interest();
  interest.getInputValue();
  interest.filter();
  interest.check();
  interest.show();
});

oResetBtn.addEventListener("click", function () {
  oInput.value = "";  
  $(".error")[0].innerHTML = "";
  if ($("#result")) {
    $("#input-area").removeChild($("#result"));
  }
})