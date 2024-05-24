
function sendId(id) {

  document.querySelector('.js-sweetalert');
  var $id = document.getElementById(`${id}`);
  var elms = document.getElementsByTagName('form');
  for (let elm of elms) {
    var objectId = elm.getAttribute('data-object-id');
    if (objectId === $id.dataset.objectId) {
      console.log('po', objectId);
    }
  }

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    confirmButtonText: 'Yes, delete it!',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(`[data-object-id="${objectId}"]`).submit();
    }
  });

}


function deleteId(id) {
  let $id = document.getElementById(`${id}`);
  var dataId = $id.dataset.id


  new swal({
    title: "Are you sure?",
    text: "You will not be able to recover this file!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    confirmButtonText: "Yes delete it!",
  }).then(({isConfirmed}) => {
    if (isConfirmed) {
      document.querySelector(`[data-id="${dataId}"]`).submit();
    }
  })
}



