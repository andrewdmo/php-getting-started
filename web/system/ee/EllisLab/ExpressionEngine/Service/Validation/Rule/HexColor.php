<?php

namespace EllisLab\ExpressionEngine\Service\Validation\Rule;

use EllisLab\ExpressionEngine\Service\Validation\ValidationRule;

/**
 * ExpressionEngine - by EllisLab
 *
 * @package        ExpressionEngine
 * @author        EllisLab Dev Team
 * @copyright    Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license        https://expressionengine.com/license
 * @link        https://ellislab.com
 * @since        Version 3.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Hex Color Validation Rule
 *
 * @package        ExpressionEngine
 * @subpackage    Validation\Rule
 * @category    Service
 * @author        EllisLab Dev Team
 * @link        https://ellislab.com
 */
class HexColor extends ValidationRule
{

    public function validate($key, $value)
    {
        return (bool)preg_match('/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/', $value);
    }

    public function getLanguageKey()
    {
        return 'hex_color';
    }

}