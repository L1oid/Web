import Welcome from '../../component/welcome/component.js';

function Page(props) {
    console.log('Page_Start::render')
    return (
      <div>
        <Welcome id = {props.id.value + 1} name='Name 1' />
        <Welcome id = {props.id.value + 2} name='Name 2' />
        <Welcome id = {props.id.value + 3} name='Name 3' />
      </div>
    );
}

export default Page;