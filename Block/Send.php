<?php
namespace Magento\VersandForm\Block;

class Send extends \Magento\Framework\View\Element\Template
{
    public function __construct(\Magento\Framework\View\Element\Template\Context $context)
    {
        parent::__construct($context);
    }

    /**
     * Get form action URL for POST booking request
     *
     * @return string
     */
    public function getFormAction()
    {
        // companymodule is given in routes.xml
        // controller_name is folder name inside controller folder
        // action is php file name inside above controller_name folder

        return 'delivery/inputform/national';
        // here controller_name is index, action is booking
    }

    /**
     * Returns description for Tooltip
     * @return string
     */
    public function getRequiredFieldsDescription(){
        return 'Diese Felder müssen ausgefüllt sein';
    }



}