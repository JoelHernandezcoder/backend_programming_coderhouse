const socket = io();

socket.on('Welcome', (data) => {
  const p = document.getElementById('msg');
  p.innerHTML = data.msg;
  prods = data.prods;
  socket.emit('notification', 'Message Received Successfully');
});

socket.on('messageBack', (data) => {
  const msgs = document.getElementById('msgs');
  let html =
    '<table class="table table-condensed"><tr><th>NAME</th><th>E-MAIL</th><th>SEND</th><th>MESSAGE</th></tr>';
  const sMail = 'style="color: blue; font-weight: bold;"';
  const sFh = 'style="color: brown; font-weight: normal;"';
  const sMsg = 'style="color: green; font-weight: normal; font-style: italic"';
  data.map((m) => {
    html += `<tr>
                    <td>${m.us}</td>
                    <td ${sMail}>${m.mail}</td>
                    <td ${sFh}>${m.fh}</td>
                    <td ${sMsg}>${m.message}</td>
                </tr>`;
  });
  html += '</table>';
  msgs.innerHTML = html;
});

socket.on('sendProds', (data) => {
  const prods = data;
  let html = '';
  const detail = document.getElementById('tablaProds');
  if (detail != null) {
    prods.map(
      (p) =>
        (html += `
                <tr>
                    <td class="nameProd"><input type="text" id="title${p.id}" value="${p.title}"></td>
                    <td class="prProd"><input type="number" id="price${p.id}" value="${p.price}"></td>
                    <td><img alt="Thumbnail" style="width: 100px;" src=${p.thumbnail}><span id="thumbnail${p.id}" style="display: none;">${p.thumbnail}</span></td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="modifyProd(${p.id})"><i class="bi bi-pencil-square"></i>Modify</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProd(${p.id})"><i class="bi bi-trash3"></i>Delete</button>
                    </td>
                </tr>
            `)
    );
    detail.innerHTML = html;
  }
});

const deleteProd = (id) => {
  socket.emit('deleteProd', { id: id });
};

const modifyProd = (id) => {
  const title = document.getElementById(`title${id}`);
  const price = document.getElementById(`price${id}`);
  const thumbnail = document.getElementById(`thumbnail${id}`);
  socket.emit('modifyProd', {
    id: id,
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.innerText,
  });
};

const send = () => {
  const user = document.getElementById('user');
  const mail = document.getElementById('mail');
  const message = document.getElementById('message');
  const fh = dateFormat(new Date());
  if (mail.value.length < 4) {
    alert('Email is required');
  } else {
    socket.emit('messageFront', {
      us: user.value,
      mail: mail.value,
      message: message.value,
      fh: fh,
    });
    message.value = '';
  }
};

socket.emit('requireProds');

const dateFormat = (fh) => {
  let fhTxt = `${zFill(parseInt(fh.getDate()), 2)}/${zFill(
    parseInt(fh.getMonth()) + 1,
    2
  )}/${parseInt(fh.getFullYear())}`;
  fhTxt += ` ${zFill(parseInt(fh.getHours()), 2)}:${zFill(
    parseInt(fh.getMinutes()),
    2
  )}:${zFill(parseInt(fh.getSeconds()), 2)}`;
  return fhTxt;
};

const zFill = (number, width, decimal) => {
  let numberOutput = Math.abs(number);
  if (decimal != undefined || decimal > 0) {
    numberOutput = Number.parseFloat(numberOutput).toFixed(decimal).toString();
  }
  let length = numberOutput.toString().length;
  let zero = '0';
  if (width <= length) {
    if (number < 0) {
      return '-' + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return '-' + zero.repeat(width - length - 1) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
};
