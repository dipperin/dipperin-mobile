export const getTxList = jest.fn().mockReturnValue({
    success: true,
    total_count: 1,
    tx_list: [{
        hash: '0x11',
        block_hash: '0x22',
        block_number: 22,
        tx_type: 1,
        to_address: '0x44',
        from_address: '0x44',
        nonce: 11,
        gasPrice: '100',
        cost: '100',
        amount: '42222',
        stake: '200',
        vrf_hash: '0x33',
        priority: 100,
        extra_data: 'yu',
        created_at: '2018/09/09',
        size: 50,
        timestamp: '23122423434444',
        position: 500,
    }],
})
export const getContactsList = jest.fn().mockReturnValue({
    success: true,
    data: {
      contract_data: [{
        address: 'string',
        contract_name: 'string',
        dip_balance: '120293',
        tx_count: 12,
        token_money_total: 'string',
      }],
      total_count: 1,
      total_pages: 1
    },
    info: 'succsess'
})
export const getAppsList = jest.fn().mockReturnValue({
    success: true,
    app: [{

    }],
    data: {
      app_data: [{

      }],
      total_count: 1,
      total_pages: 1
    },
    info: 'succsess'
})
export const getFortuneList = jest.fn().mockReturnValue({
    success: true,
    app: [{
        name: 'test',
        image_url: 'imgurl',
        classification: '竞猜'
    }],
    data: {
      app_data: [{
        name: 'test',
        balance: 'string',
        user_count: '1212',
        tx_count: 12,
        tx_amount: '12121212',
        image_url: 'ingurl',
        classification: 'classification'
      }],
      total_count: 1,
      total_pages: 1
    },
    info: 'succsess'
})
export const getBlockHeight = jest.fn().mockReturnValue({
    succsess: true,
    total_blocks: 10
})
