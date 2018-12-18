<?php
namespace Magento\VersandForm\Block;

class Send extends \Magento\Framework\View\Element\Template
{
    public function __construct(\Magento\Framework\View\Element\Template\Context $context)
    {
        parent::__construct($context);
    }

    /**
     * Returns description for Tooltip
     * @return string
     */
    public function getRequiredFieldsDescription(){
                return 'Diese Felder müssen ausgefüllt sein';
    }

}