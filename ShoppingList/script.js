var data = {
  title: "Michal's shopping list",
  items: [{text:'Bread', quantity:"5",checked:false, editMode:false },
          {text:'Apples', quantity:"3",checked:false, editMode:false}],
  newItem:[{text:'', quantity:''}]
};

new Vue({
  el: '#app',
  data: data,
  methods:{
    addItem: function() {
      var text, quantity;
      text = this.newItem.text.trim();
      quantity = this.newItem.quantity.trim();

      if(text && quantity>0 && quantity<=99){
        this.items.push({
          text:text,
          quantity: quantity,
          checked:false,
          editMode:false
        });
        this.newItem.text='',
        this.newItem.quantity='';
      }

    },
    turnOnEdit: function(item){
      item.editMode = true;
    },
    saveItem: function(item){
      item.editMode = false;
    },
    removeItem: function(index){
      this.items.splice(index,1);
    },
    addQuantity: function(item){
      if(item.quantity<"99")
      item.quantity = parseInt(item.quantity) + 1;
    },
    dropQuantity: function(item){
      if(item.quantity>0){
        item.quantity = parseInt(item.quantity) - 1;
      }
    }
  }
});


function editTitle(){
  $('#title-edit').modal('show');
}
