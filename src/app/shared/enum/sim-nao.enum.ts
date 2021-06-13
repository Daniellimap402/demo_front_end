export enum SimNaoEnum {

    SIM = 'S',
    NAO = 'N',

}

export const SimNaoEnumMapper = {
    [SimNaoEnum.SIM]: 'Sim',
    [SimNaoEnum.NAO]: 'Não',
};

export const SimNaoRadioOptions = [
    { name: SimNaoEnumMapper[SimNaoEnum.SIM], key: SimNaoEnum.SIM },
    { name: SimNaoEnumMapper[SimNaoEnum.NAO], key: SimNaoEnum.NAO },
];