fetch("all/footer/footer.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("social-section").innerHTML = html;
      });