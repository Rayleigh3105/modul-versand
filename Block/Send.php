<?php
namespace Magento\VersandForm\Block;

class Send extends \Magento\Framework\View\Element\Template
{
    protected $helperData;
    public function __construct(
        \Magento\VersandForm\Helper\Data $helperData,
        \Magento\Framework\View\Element\Template\Context $context)
    {
        $this->helperData = $helperData;
        parent::__construct($context);
    }

    /**
     * Returns description for Tooltip
     * @return string
     */
    public function getRequiredFieldsDescription(){
                return 'Diese Felder müssen ausgefüllt sein';
    }
    /**
     * This value can be either '1' which is YES or '0' which is NO
     * This value can be set in the admin Settings under Store -> Configuration -> Camel 24
     */
    public function  getDataFromAdminPanel() {
        return $this->helperData->getGeneralConfig('bool_gross');
    }

}