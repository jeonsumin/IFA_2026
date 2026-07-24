import {Button, Checkbox, Select} from "shared/ui";

export const Home = () => {


    return (
        <div>
            <h1>home</h1>

            <Checkbox label={'checkbox'}/>
            <Select options={[
                {
                    label: 'label1',
                    value: '1'
                },
                {
                    label: 'label2',
                    value: '2',
                    disabled: true
                },
            ]}/>
            <Button>button</Button>
        </div>
    )
}
