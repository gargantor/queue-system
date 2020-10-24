class helper {
  fixallHeight(){
    this.fixLoginRegisterHeight();
    this.fixSidebarHeight();
    this.fixContentHeight();
  }
  fixLoginRegisterHeight(){
    const login = document.getElementsByClassName('login-box');
    const register = document.getElementsByClassName('register-box');
    const vcenter = document.getElementsByClassName('vcenter-box');
    const body = document.body;
    body.style.height = null;
    body.style.minHeight = null;
    if( vcenter.length !== 0 ){
      body.style.height = null;      
    }
    else if(login.length === 0 && register.length === 0) {
      body.style.height = 'auto';      
    } else {
      const selected = login.length === 0 ? register[0] : login[0];
      const selectedHeight = selected.clientHeight;
      body.style.minHeight = selectedHeight+'px';
      console.log(selectedHeight);
    }
    //console.log(login.length);

  }
  fixSidebarHeight(){
    const sidebar = document.getElementsByClassName('main-sidebar');
    const windowHeight = window.frames.innerHeight;
    const bodyHeight = document.body.clientHeight;
    if(sidebar[0]){
      sidebar[0].style.minHeight = bodyHeight > windowHeight ? bodyHeight+'px' : windowHeight+'px';
    }
    
    //console.log('calculate sidebar height' + windowHeight);

  }
  fixContentHeight(){
    const header = document.getElementsByClassName('main-header');
    const footer = document.getElementsByClassName('main-footer');
    const content = document.getElementsByClassName('content-wrapper');
    const windowHeight = window.frames.innerHeight;    
    const bodyHeight = document.body.clientHeight;  
    if(content[0]){
      content[0].style.minHeight = (windowHeight - (header[0].clientHeight+1) - (footer[0].clientHeight+1))+'px';
    }
  }

}
export default new helper();
/*function fixLoginRegisterHeight() {
    if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {
      $('body, html').css('height', 'auto')
    } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {
      let box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height()

      if ($('body').css('min-height') !== box_height) {
        $('body').css('min-height', box_height)
      }
    }
}*/
